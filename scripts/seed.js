const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

async function main() {
  const james = await client.person.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "James Cameron",
      age: 65,
      type: "Director",
      bio: `James Francis Cameron (born August 16, 1954) is a Canadian filmmaker,\
            director, producer, screenwriter, inventor, engineer, philanthropist, and \
            deep-sea explorer.`,
    },
  });

  const joss = await client.person.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Joss Whedon",
      age: 56,
      type: "Director",
      bio: `Joseph Hill "Joss" Whedon (born June 23, 1964) is an American screenwriter, \
            director, producer, and composer. He is known for creating and writing the \
            television series Buffy the Vampire Slayer (1997–2003), Angel (1999–2004), \
            Firefly (2002), and Dollhouse (2009–2010), as well as co-writing Toy Story \
            (1995) and directing The Avengers (2012).`,
    },
  });

  const vince = await client.person.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Vince Gilligan",
      age: 58,
      type: "Director",
      bio: `Vincent Anthony "Vince" Gilligan (born August 11, 1967) is an American \
            screenwriter, producer, and director. He is best known for creating and writing \
            the television series Breaking Bad (2008–2013) and Better Call Saul (2015–present).`,
    },
  });

  const avatar = await client.movie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Avatar",
      year: 2009,
      type: "movie",
      genre: "Action, Adventure, Fantasy",
      poster: "https://m.media-amazon.com/images/M/MV5BMTMwNjQ5NjQxN15BMl5BanBnXkFtZTcwMjQ5NjUzNw@@._V1_SX300.jpg",
      cast: {
        connect: {
          id: james.id,
        },
        create: [
          {
            name: "Sam Worthington",
            age: 43,
            type: "Actor",
            bio: `Samuel Henry "Sam" Worthington (born 2 August 1976) is an Australian \
            actor. He is best known for his roles as Perseus in the 2007 film Clash of the \
            Titans, Jake Sully in the 2009 film Avatar, Marcus Wright in the 2010 film \
            Terminator Salvation, and as the title character in the 2012 film Wrath of the \
            Titans.`,
          },
          {
            name: "Zoe Saldana",
            age: 42,
            type: "Actor",
            bio: `Zoe Yadira Saldaña Nazario (born June 19, 1978) is an American actress \
            and dancer. She began her career on stage at age 10, and made her screen debut \
            in an episode of Law & Order: Trial by Jury in 2005. She rose to prominence \
            with her roles as Nyota Uhura in the Star Trek film series (2009–2016), \
            Neytiri in Avatar (2009), and Gamora in the Marvel Cinematic Universe \
            (2014–present).`,
          },
          {
            name: "Sigourney Weaver",
            age: 71,
            type: "Actor",
            bio: `Susan Alexandra "Sigourney" Weaver (born October 8, 1949) is an \
            American actress and film producer. She has appeared in more than 90 films \
            and is best known for her roles as Ellen Ripley in the Alien film series, \
            Dana Barrett in Ghostbusters (1984), Dian Fossey in Gorillas in the Mist \
            (1988), and Dr. Grace Augustine in Avatar (2009).`,
          },
        ],
      },
    },
  });

  // add some awards and reviews
  await client.award.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Best Director",
      year: 2009,
      movie: {
        connect: { id: avatar.id },
      },
      person: {
        connect: { id: james.id },
      },
    },
  });

  await client.award.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Best Cinematography",
      year: 2009,
      movie: {
        connect: { id: avatar.id },
      },
      person: {
        connect: { id: james.id },
      },
    },
  });

  // reviews
  await client.review.upsert({
    where: { id: 1 },
    update: {},
    create: {
      comment: `Avatar is a 2009 American epic science fiction film directed, written, \
      produced, and co-edited by James Cameron, and starring Sam Worthington, Zoe Saldana, \
      Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. The film is set in the mid-22nd \
      century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in \
      the Alpha Centauri star system, in order to mine the mineral unobtanium, a room-temperature \
      superconductor. The expansion of the mining colony threatens the continued existence of \
      a local tribe of Na'vi – a humanoid species indigenous to Pandora. The film's title refers \
      to a genetically engineered Na'vi body with the mind of a deceased human, used to interact \
      with the natives of Pandora.`,
      rating: 5,
      movie: {
        connect: { id: avatar.id },
      },
    },
  });

  // another great review
  await client.review.upsert({
    where: { id: 2 },
    update: {},
    create: {
      comment: `The movie is a visual masterpiece. The story is a bit thin, but the \
      visuals are so stunning that you don't really care. The 3D is amazing. The \
      acting is good, but not great.`,
      rating: 4,
      movie: {
        connect: { id: avatar.id },
      },
    },
  });

  // titanic
  const titanic = await client.movie.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Titanic",
      year: 1997,
      type: "movie",
      genre: "Drama, Romance",
      poster: "https://m.media-amazon.com/images/M/MV5BMTMwNjQ5NjQxN15BMl5BanBnXkFtZTcwMjQ5NjUzNw@@._V1_SX300.jpg",
      cast: {
        connect: {
          id: james.id,
        },
        create: [
          {
            name: "Leonardo DiCaprio",
            age: 46,
            type: "Actor",
            bio: `Leonardo Wilhelm DiCaprio (born November 11, 1974) is an American \
            actor, film producer, and environmentalist. He began his career by starring \
            in television commercials in the late 1980s. He next had recurring roles in \
            various television series, such as the soap opera Santa Barbara and the sitcom \
            Growing Pains. DiCaprio gained public recognition with his role in the film \
            "Critters 3" (1991).`,
          },
          {
            name: "Kate Winslet",
            age: 45,
            type: "Actor",
            bio: `Kate Elizabeth Winslet (born 5 October 1975) is an English actress \
            and singer. She is the recipient of an Academy Award, an Emmy Award, three \
            Grammy Awards, a BAFTA Award, a Golden Globe Award, a Screen Actors Guild \
            Award, and the Volpi Cup. She is the youngest person to receive six Academy \
            Award nominations.`,
          },
        ],
      },
    },
  });

  // add some awards and reviews
  await client.award.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Best Director",
      year: 1997,
      movie: {
        connect: { id: titanic.id },
      },
      person: {
        connect: { id: 1 },
      },
    },
  });

  await client.award.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Best Cinematography",
      year: 1997,
      movie: {
        connect: { id: titanic.id },
      },
      person: {
        connect: { id: james.id },
      },
    },
  });

  // reviews
  await client.review.upsert({
    where: { id: 3 },
    update: {},
    create: {
      comment: `Titanic is a 1997 American epic romance and disaster film directed, \
      written, co-produced, and co-edited by James Cameron. A fictionalized account of the \
      sinking of the RMS Titanic, it stars Leonardo DiCaprio and Kate Winslet as members of \
      different social classes who fall in love aboard the ship during its ill-fated maiden \
      voyage. The film was released on December 19, 1997, by Paramount Pictures.`,
      rating: 5,
      movie: {
        connect: { id: titanic.id },
      },
    },
  });

  // another great review
  await client.review.upsert({
    where: { id: 4 },
    update: {},
    create: {
      comment: `This is one of the best movies ever made. The story is great, the \
      acting is great, the special effects are great, the music is great, the costumes \
      are great, the sets are great, the cinematography is great, the direction is great, \
      the editing is great, the sound is great, the casting is great, the production \
      design is great, the makeup is great, the visual effects are great. \
      Everything about this movie is great.`,
      rating: 5,
      movie: {
        connect: { id: titanic.id },
      },
    },
  });

  // the avengers
  const avengers = await client.movie.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "The Avengers",
      year: 2012,
      type: "movie",
      genre: "Action, Adventure, Sci-Fi",
      poster: "https://m.media-amazon.com/images/M/MV5BMTYwNjQ5MjQxN15BMl5BanBnXkFtZTYwNjQ5NjE3._V1_SX300.jpg",
      cast: {
        connect: {
          id: joss.id,
        },
        create: [
          {
            name: "Robert Downey Jr.",
            age: 55,
            type: "Actor",
            bio: `Robert John Downey Jr. (born April 4, 1965) is an American \
            actor. His career has included critical and popular success in his \
            youth, followed by a period of substance abuse and legal troubles, \
            and a resurgence of commercial success in middle age. For three \
            consecutive years from 2012 to 2015, Downey has topped the Forbes \
            list of Hollywood's highest-paid actors, making an estimated $80 \
            million in earnings between June 2014 and June 2015.`,
          },
          {
            name: "Chris Evans",
            age: 39,
            type: "Actor",
            bio: `Christopher Robert Evans (born June 13, 1981) is an American \
            actor. Evans is known for his superhero roles as the Marvel Comics \
            characters Captain America in the Marvel Cinematic Universe and the \
            Human Torch in Fantastic Four (2005) and its 2007 sequel. He made his \
            film debut in the 2000 comedy Not Another Teen Movie.`,
          },
        ],
      },
    },
  });

  // add some awards and reviews
  await client.award.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Best Director",
      year: 2012,
      movie: {
        connect: { id: avengers.id },
      },
      person: {
        connect: {
          id: joss.id,
        },
      },
    },
  });

  // reviews
  await client.review.upsert({
    where: { id: 5 },
    update: {},
    create: {
      comment: `Superheroes movie with a great cast and a great story. My favorite \
      superhero movie of all time.`,
      rating: 5,
      movie: {
        connect: { id: avengers.id },
      },
    },
  });

  // breaking bad
  const breakingBad = await client.movie.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Breaking Bad",
      year: 2008,
      type: "series",
      genre: "Crime, Drama, Thriller",
      poster: "https://m.media-amazon.com/images/M/MV5BMTIwNjQ5MjQxN15BMl5BanBnXkFtZTYwNjQ5NjE3._V1_SX300.jpg",
      cast: {
        connect: {
          id: vince.id,
        },
        create: [
          {
            name: "Bryan Cranston",
            age: 64,
            type: "Actor",
            bio: `Bryan Lee Cranston (born March 7, 1956) is an American actor, \
            voice actor, writer, producer, and director. He is best known for \
            his roles as Hal, the father in the Fox sitcom Malcolm in the Middle \
            (2000–2006), and as Walter White, the main character in the AMC \
            crime drama series Breaking Bad (2008–2013).`,
          },
          {
            name: "Aaron Paul",
            age: 43,
            type: "Actor",
            bio: `Aaron Paul Sturtevant (born August 27, 1979) is an American \
            actor. He is known for his role as Jesse Pinkman in the AMC \
            crime drama series Breaking Bad (2008–2013).`,
          },
        ],
      },
    },
  });

  // add some awards and reviews
  const bryan = await client.person.findFirst({
    where: { name: "Bryan Cranston" },
  });

  await client.award.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Best Actor",
      year: 2008,
      movie: {
        connect: { id: breakingBad.id },
      },
      person: {
        connect: {
          id: bryan?.id,
        },
      },
    },
  });

  // reviews
  await client.review.upsert({
    where: { id: 6 },
    update: {},
    create: {
      comment: `What i love about this show is that it's not just about the \
      chemistry between the two main characters, it's also about the chemistry \
      between the characters and the audience. The show is so well written and \
      the actors are so good that you can't help but feel like you're part of \
      the show.`,
      rating: 5,
      movie: {
        connect: { id: breakingBad.id },
      },
    },
  });

  // add episodes
  await client.episode.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Pilot",
      year: 2008,
      poster: "https://m.media-amazon.com/images/M/MV5BMTIwNjQ5MjQxN15BMl5BanBnXkFtZTYwNjQ5NjE3._V1_SX300.jpg",
      movieId: breakingBad.id,
    },
  });

  await client.episode.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Cat's in the Bag...",
      year: 2008,
      poster: "https://m.media-amazon.com/images/M/MV5BMTIwNjQ5MjQxN15BMl5BanBnXkFtZTYwNjQ5NjE3._V1_SX300.jpg",
      movieId: breakingBad.id,
    },
  });

  await client.episode.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "...And the Bag's in the River",
      year: 2008,
      poster: "https://m.media-amazon.com/images/M/MV5BMTIwNjQ5MjQxN15BMl5BanBnXkFtZTYwNjQ5NjE3._V1_SX300.jpg",
      movieId: breakingBad.id,
    },
  });
}

main()
  .then(() => {
    client.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    console.log("error:", e);
    client.$disconnect();
    process.exit(1);
  });
