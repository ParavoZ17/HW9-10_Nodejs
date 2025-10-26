const notFoundPage = (req, res) => {
  res.status(404).json({
    message: `Page ${req.url} not found`,
  });
};

export default notFoundPage;
