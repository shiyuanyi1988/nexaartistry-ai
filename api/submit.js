module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只支持 POST 请求' });
  }

  const { name, contact, need } = req.body || {};

  return res.status(200).json({
    message: `已收到 ${name || '客户'} 的需求，AI 顾问已生成初步建议。`,
    data: {
      name,
      contact,
      need,
      status: 'received',
    },
  });
};
