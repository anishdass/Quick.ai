import sql from "../config/db.js";

// getUserCreations
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM CREATIONS WHERE USER_ID=${userId}`;

    res.json({ success: true, content: creations });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// getPublishedCreations
export const getPublishedCreations = async (req, res) => {
  try {
    const publishedContent =
      await sql`SELECT * FROM CREATIONS WHERE PUBLISH=TRUE ORDER BY CREATED_AT DESC`;

    res.json({ success: true, content: publishedContent });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// toggleLikeCreations
export const toggleLikes = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const creations = await sql`SELECT * FROM CREATIONS WHERE ID=${id}`;

    if (!creations) {
      return res.json({
        success: false,
        message: "No creations found for the id",
      });
    }

    const currentLikes = creations.likes;
    const usrIdStr = userId.toString();
    let updateLikes;
    let message;

    if (currentLikes.includes(usrIdStr)) {
      updateLikes = currentLikes.filter((user) => user !== usrIdStr);
      message = "Creation unliked";
    } else {
      updateLikes = [...currentLikes, usrIdStr];
      message = "Creation Liked";
    }

    const formattedArray = `{${updateLikes.json(",")}}`;

    await sql`UPDATE creations SET likes=${formattedArray}::text[] WHERE id=${id}`;

    res.json({ success: true, creations });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
