const handler = (req, res)  => {
  res.status(200).json({ message: "Hello!" })
}

export default handler;