import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InquiryDataPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/contact/sheet-data');
        setData(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to fetch inquiry data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">APJ Inquiry Data</h1>
          <p className="text-slate-600">यह पेज Google Sheet से सीधे पूछताछ डेटा लाता है और UI पर प्रदर्शित करता है।</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="inline-flex items-center gap-3 text-slate-700">
                <svg className="h-6 w-6 animate-spin text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M22 12a10 10 0 0 0-10-10" />
                </svg>
                Loading inquiries...
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-red-700">
              <h2 className="font-semibold text-lg mb-2">Unable to load inquiry data</h2>
              <p>{error}</p>
              <p className="mt-2 text-sm text-slate-500">यदि Google Sheets credentials कॉन्फ़िगर नहीं हैं, तो backend में उन्हें अपने .env में जोड़ें।</p>
            </div>
          ) : data.length === 0 ? (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-amber-900">
              No inquiry rows found in the Google Sheet yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Timestamp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Subject</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {data.map((item, index) => (
                    <tr key={`${item.timestamp}-${index}`} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{item.timestamp}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{item.name}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{item.email}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{item.phone}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{item.subject}</td>
                      <td className="px-4 py-4 text-sm text-slate-600 max-w-xl break-words">{item.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
