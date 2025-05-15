const moongose = require("mongoose");

const newsletterSchema = new moongose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = moongose.model("Newsletter", newsletterSchema);
