import {
  createInquiry,
  getAllInquiries,
  getInquiryCount,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from '../models/inquiryModel.js';

export const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const inquiryId = await createInquiry({ name, email, phone, subject, message });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. We will respond within 24 hours.',
      inquiryId,
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const inquiries = await getAllInquiries(status, parseInt(limit), offset);
    const totalCount = await getInquiryCount(status);

    return res.status(200).json({
      success: true,
      data: inquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const inquiry = await getInquiryById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const validStatuses = ['pending', 'replied', 'resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const updated = await updateInquiryStatus(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const removeInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await deleteInquiry(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
