// import NavigationBar from "../components/NavigationBar.jsx";
import ImageBanner from "../components/home/ImageBanner.jsx";
import PopularStories from "../components/home/PopularStories.jsx";
import ShowsOfWeek from "../components/home/ShowsOfWeek.jsx";
import TopStories from "../components/home/TopStories.jsx";

const showsOfWeeklist = [
  {
    id: 1,
    name: "History",
    url: "./images/image.png",
    publisher: "sam",
  },
  {
    id: 2,
    name: "Geography",
    url: "./images/image.png",
    publisher: "john",
  },
  {
    id: 3,
    name: "Science",
    url: "./images/image.png",
    publisher: "sarah",
  },
  {
    id: 4,
    name: "Technology",
    url: "./images/image.png",
    publisher: "jane",
  },
  {
    id: 5,
    name: "Entertainment",
    url: "./images/image.png",
    publisher: "bill",
  },
  {
    id: 6,
    name: "Business",
    url: "./images/image.png",
    publisher: "tom",
  },
];
const topStoriesList = [
  {
    id: 1,
    name: "History",
    url: "./images/image.png",
    publisher: "sam",
  },
  {
    id: 2,
    name: "Geography",
    url: "./images/image.png",
    publisher: "john",
  },
  {
    id: 3,
    name: "Science",
    url: "./images/image.png",
    publisher: "sarah",
  },
  {
    id: 4,
    name: "Technology",
    url: "./images/image.png",
    publisher: "jane",
  },
  {
    id: 5,
    name: "Entertainment",
    url: "./images/image.png",
    publisher: "bill",
  },
  {
    id: 6,
    name: "Business",
    url: "./images/image.png",
    publisher: "tom",
  },
];
const popularStoryList = [
  {
    id: 1,
    name: "History",
    url: "./images/image.png",
    publisher: "sam",
  },
  {
    id: 2,
    name: "Geography",
    url: "./images/image.png",
    publisher: "john",
  },
  {
    id: 3,
    name: "Science",
    url: "./images/image.png",
    publisher: "sarah",
  },
  {
    id: 4,
    name: "Technology",
    url: "./images/image.png",
    publisher: "jane",
  },
  {
    id: 5,
    name: "Entertainment",
    url: "./images/image.png",
    publisher: "bill",
  },
  {
    id: 6,
    name: "Business",
    url: "./images/image.png",
    publisher: "tom",
  },
];
const HomePage = () => {
  return (
    <>
      {/* <div className="container mx-auto p-2">
        <ImageBanner />
        <section>
          <div className="container mx-auto">
            <div>
              <header className="flex items-center justify-between mb-2 mt-6">
                <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:corsor-pointer">
                  Popular Stories
                </div>
                <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
                  SEE ALL
                </div>
                <PopularStories stories={popularStoryList} />
              </header>
            </div>
          </div>
        </section>
      </div> */}
      <div className="container mx-auto p-2">
        <ImageBanner />
        <section>
          <header className="flex items-center justify-between mb-2 mt-6">
            <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
              Popular Stories
            </div>
            <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
              SEE ALL
            </div>
          </header>
          <PopularStories stories={popularStoryList} />
        </section>
        <div>
          <header className="flex items-center justify-between mb-2 mt-6">
            <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
              Top Stories & Podcasts
            </div>
            <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
              SEE ALL
            </div>
          </header>
          <TopStories stories={topStoriesList} />
        </div>
        <div>
          <header className="flex items-center justify-between mb-2 mt-6">
            <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
              Shows of the week
            </div>
            <div className="text-xs hover:underline font-semibold uppercase text-link tracking-wider hover:cursor-pointer">
              SEE ALL
            </div>
          </header>
          <ShowsOfWeek stories={showsOfWeeklist} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
