import moment from "moment";
import randomString from "randomstring";
import { v4 as uuidv4 } from "uuid";

export const mock = {
  eventImg:
    "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
  profileImg:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  ticketData: {
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    status: "Unused",
    eventName: "Open Data Science Conference",
    eventDate: {
      from: moment(),
      to: moment().add(1, "days"),
    },
    eventAddr: {
      addr1: "Fort Mason Center",
      addr2: "Festival Pavilion, San Francisco, CA 94123",
    },
    description:
      "The San Francisco Fall Show, the annual benefit for the 50 year old nonprofit Enterprise for Youth, is held at Fort Mason Center for Arts & Culture each fall, presenting",
  },

  eventData: {
    eventId: 1,
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventName: "Startups Batch Demo Day 2019",
    ticketPrice: 10,
    ticketsLeft: 10,
    host: {
      profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      name: "Vacant Land",
    },
    numOfBuyers: 300,
    numOfAttended: 230,
    eventDate: {
      from: moment(),
      to: moment().add(1, "days"),
    },
    eventAddr: {
      addr1: "Fort Mason Center",
      addr2: "Festival Pavilion, San Francisco, CA 94123",
    },
    description:
      "The San Francisco Fall Show, the annual benefit for the 50 year old nonprofit Enterprise for Youth, is held at Fort Mason Center for Arts & Culture each fall, presenting the fin…",
  },

  sbtData: {
    sbtImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    sbtName: "Open Data Science SBT",
    airdropDate: moment(),
  },
};

export const generateMockEvents = (numOfEvents) => {
  const eventLists = [];

  for (let i = 0; i < numOfEvents; i++) {
    eventLists.push({
      id: uuidv4(),
      title: "2022 San Francisco Developer Conference",
      privacy: "PUBLIC",
      eventAddress1: "San Francisco, CA 94102",
      eventAddress2: "1st Floor, Room 102A",
      eventStartDt: moment(),
      eventEndDt: moment(),
      description:
        "Civic Center is distinguished by its many beaux arts-style government buildings and performing arts venues. City Hall, a sprawling 1915 landmark with a gold-leafed dome, anchors a complex that includes the elegant War Memorial Opera House, the Asian Art Museum and a large plaza. Entertainment seekers choose from plays at historic theaters, and concerts at sleek spots such as Davis Symphony Hall and the SFJazz Center.",
      category: "PERSONAL",
      status: "CREATED",
      numOfAttendees: 20,
      tags: ["Science", "Engineering", "Climate"],
      host: {
        id: uuidv4(),
        walletAddr: uuidv4(),
        nationality: "KR",
        birthday: moment(),
        firstName: randomString.generate(),
        lastName: randomString.generate(),
        profileURL: "https://picsum.photos/300/200",
        companyAddress1: randomString.generate(),
        companyAddress2: randomString.generate(),
        twitterHandle: randomString.generate(),
        married: false,
        marriageDt: moment(),
        isGuest: false,
        ens: randomString.generate(),
      },
      medias: [
        {
          id: uuidv4(),
          type: "IMAGE",
          category: "EVENT_IMAGE",
          url: "https://picsum.photos/300/200",
        },
      ],
      ticketMeta: {
        type: "PAID",
        ticketName: randomString.generate(),
        contractAddress: uuidv4(),
        imgUrl: "https://picsum.photos/300/200",
        ticketQuantity: 20,
        ticketPrice: 0.01,
        ticketsLeft: 10,
        salesStartDt: moment(),
        salesEndDt: moment(),
      },
    });
  }
  return eventLists;
};
