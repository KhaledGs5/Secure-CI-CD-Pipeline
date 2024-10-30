module.exports = mongoose => {
    const Team = mongoose.model(
      "team",
      mongoose.Schema(
        {
          name: String,
          age: Number,
          playersNumber: Number
        },
        { timestamps: true }
      )
    );
  
    return Team;
  };