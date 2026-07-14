import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiryApi } from '../utils/apiClient';

export default function StudentQueries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const navigate = useNavigate();

  // Load inquiries
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    fetchInquiries();
  }, [filter, pagination.page, navigate]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filter !== 'all' && { status: filter }),
      };

      const response = await inquiryApi.getAll(params);

      setInquiries(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load inquiries';
      toast.error(message);
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiryApi.updateStatus(id, newStatus);
      toast.success('Inquiry status updated');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await inquiryApi.delete(id);
      toast.success('Inquiry deleted');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      replied: 'bg-blue-50 text-blue-700 border-blue-200',
      resolved: 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock size={16} />,
      replied: <Eye size={16} />,
      resolved: <CheckCircle size={16} />,
    };
    return icons[status] || icons.pending;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-0.5 hover:text-[#1e3a5f] hover:shadow-xl"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Student Queries</h1>
          <p className="text-slate-600">Manage all inquiries from prospective students</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 border-b border-slate-200 pb-6">
          {[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'Replied', value: 'replied' },
            { label: 'Resolved', value: 'resolved' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setFilter(tab.value);
                setPagination({ ...pagination, page: 1 });
              }}
              className={`px-6 py-2 font-semibold rounded-full transition-all ${
                filter === tab.value
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin">⚙️ Loading...</div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <AlertCircle size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 text-lg">No inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{inquiry.name}</div>
                      <div className="text-sm text-slate-600">{inquiry.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{inquiry.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {inquiry.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`px-3 py-2 rounded-full text-sm font-medium border cursor-pointer transition-all ${getStatusColor(
                          inquiry.status
                        )} flex items-center gap-2`}
                      >
                        <option value="pending">Pending</option>
                        <option value="replied">Replied</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPagination({ ...pagination, page })}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  pagination.page === page
                    ? 'bg-[#1e3a5f] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Inquiry Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Name</label>
                <p className="text-slate-900 font-medium">{selectedInquiry.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Email</label>
                  <p className="text-slate-900 font-medium break-all">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Phone</label>
                  <p className="text-slate-900 font-medium">{selectedInquiry.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Subject</label>
                <p className="text-slate-900 font-medium">{selectedInquiry.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Status</label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    handleStatusChange(selectedInquiry.id, e.target.value);
                    setSelectedInquiry({ ...selectedInquiry, status: e.target.value });
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium border ${getStatusColor(
                    selectedInquiry.status
                  )}`}
                >
                  <option value="pending">Pending</option>
                  <option value="replied">Replied</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Date</label>
                <p className="text-slate-900 font-medium">
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Message</label>
                <p className="text-slate-900 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-200">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedInquiry.id);
                  setSelectedInquiry(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
