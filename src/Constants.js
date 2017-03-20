export const ItemTypes = {
  BURNER_INTEREST: "burner-interest",
  UP_NEXT_INTEREST: "up-next-interest",
  ARCHIVE_INTEREST: "archive-interest",
  HABIT_INTEREST: "habit-interest"
};

//dynamically generate burners based on config #
export const InterestStages = {
  BURNER: {
    1: "burner1",
    2: "burner2",
    3: "burner3",
    4: "burner4"
  },
  UP_NEXT: "up-next",
  ARCHIVE: "archive",
  HABIT: "habit"
}

//dynamically generate burners based on config #
export const InterestResourceStubs = {
  CHUNKS: {
    name: "BLAH"
  },
  MATERIALS: {
    name: "BLAH"
  },
  PEOPLE: {
    name: "BLAH"
  },
  EVENTS: {
    name: "BLAH"
  }
}


export const getRandomId = function (length) {
  var x = 0;
  var multiplier = "9";
  var adder = "1";
  while(x < length - 1) {
    multiplier += "0";
    adder += "0";
    x++;
  }
  return Math.floor(Math.random()*parseInt(multiplier)) + parseInt(adder) ;
}
