const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true 
    },
    desc: { 
      type: String, 
      required: false 
    },
    image: { 
      type: String 
    },
    likes: { 
      type: [] 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);