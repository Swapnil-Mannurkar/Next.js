const handler = (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input data." });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      comment,
    };

    console.log(newComment);
    res
      .status(201)
      .json({ message: "Sucessfully added the comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Swapnil",
        comment: "First comment",
      },
      {
        id: "c2",
        name: "Mannurkar",
        comment: "Second comment",
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
};

export default handler;
