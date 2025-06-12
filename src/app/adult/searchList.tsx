export interface SearchItem {
  title: string;
  subtitle?: string;
  duration?: string;
  type: "music" | "movie" | "doc" | "series";
  image: string;
  videoUrl: string;
  link: string;
}

export const SearchList: SearchItem[] = [
  {
    title: "Ciwan Haco - Dîlok",
    subtitle: "Dîlok Album",
    duration: "3:52",
    type: "music",
    image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
    videoUrl: "/adults/Music section/Ciwan Haco/Yari serin.mp4",
    link: "/adult/music/hunermend/playing?playlist=0&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
  },
  {
    title: "Ciwan Haco - Hewal",
    subtitle: "Live",
    duration: "4:21",
    type: "music",
    image: "/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
    videoUrl: "/adults/Music section/Ciwan Haco/Macek.mp4",
    link: "/adult/music/hunermend/playing?playlist=0&image=/adults/Music section/Ciwan Haco/Ciwan Haco.jpeg",
  },
  {
    title: "Şivan Perwer - Ey Ferat",
    subtitle: "Best of Şivan",
    duration: "5:00",
    type: "music",
    image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
    videoUrl: "/adults/Music section/sivan Perwer/Dur Dur.mp4",
    link: "/adult/music/hunermend/playing?playlist=1&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
  },
  {
    title: "Şivan Perwer - Daye",
    subtitle: "Classic",
    duration: "4:35",
    type: "music",
    image: "/adults/Music section/sivan Perwer/sivan Perwer.jpg",
    videoUrl: "/adults/Music section/sivan Perwer/Nemire Lawik.mp4",
    link: "/adult/music/hunermend/playing?playlist=1&image=/adults/Music section/sivan Perwer/sivan Perwer.jpg",
  },
  {
    title: "Diyar Dersim - Roj baş (1)",
    subtitle: "Live in Amed",
    duration: "3:40",
    type: "music",
    image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
    videoUrl: "/adults/Music section/Diyar dersim/Emrem Buri.mp4",
    link: "/adult/music/hunermend/playing?playlist=2&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
  },
  {
    title: "Diyar Dersim - Roj baş (2)",
    subtitle: "Live in Amed",
    duration: "3:40",
    type: "music",
    image: "/adults/Music section/Diyar dersim/Diyar dersim.jpg",
    videoUrl: "/adults/Music section/Diyar dersim/TE DIGO NA.mp4",
    link: "/adult/music/hunermend/playing?playlist=2&image=/adults/Music section/Diyar dersim/Diyar dersim.jpg",
  },
  {
    title: "Seyda Rojava - Helebçe (1)",
    subtitle: "Memories",
    duration: "4:11",
    type: "music",
    image: "/adults/Music section/seyda Rojava/seyda.jpg",
    videoUrl: "/adults/Music section/seyda Rojava/Gula Male.mp4",
    link: "/adult/music/hunermend/playing?playlist=3&image=/adults/Music section/seyda Rojava/seyda.jpg",
  },
  {
    title: "Seyda Rojava - Helebçe (2)",
    subtitle: "Memories",
    duration: "4:11",
    type: "music",
    image: "/adults/Music section/seyda Rojava/seyda.jpg",
    videoUrl: "/adults/Music section/seyda Rojava/Tene Dilem.mp4",
    link: "/adult/music/hunermend/playing?playlist=3&image=/adults/Music section/seyda Rojava/seyda.jpg",
  },
  {
    title: "Kingdom of Heaven",
    videoUrl: "/adults/Movies section/Kingdom of Heaven.mp4",
    image: "/adults/Movies section/Kingdom of Heaven.mp4",
    type: "movie",
    link: "/adult/cinema/filme?title=Kingdom of Heaven&videoUrl=/adults/Movies section/Kingdom of Heaven.mp4&photoUrl=/images/adults/movie3.png",
  },
  {
    title: "Brave Heart",
    videoUrl: "/adults/Movies section/Braveheart.mp4",
    image: "/images/adults/Brave.jpg",
    type: "movie",
    link: "/adult/cinema/filme?title=Brave Heart&videoUrl=/adults/Movies section/Braveheart.mp4&photoUrl=/images/adults/movie2.png",
  },
  {
    title: "NOAH",
    videoUrl: "/adults/Movies section/NOAH.mp4",
    image: "//adults/Movies section/NOAH.mp4",
    type: "movie",
    link: "/adult/cinema/filme?title=NOAH&videoUrl=/adults/Movies section/NOAH.mp4&photoUrl=/images/adults/series3.png",
  },
  {
    title: "The Passion of The Christ",
    videoUrl: "/adults/Movies section/The Passion of The Christ.mp4",
    image: "/images/adults/christ1.jpg",
    type: "movie",
    link: "/adult/cinema/filme?title=The Passion of The Christ&videoUrl=/adults/Movies section/The Passion of The Christ.mp4&photoUrl=/images/adults/series8.png",
  },
  {
    title: "South Africa Documentary",
    videoUrl: "/adults/Documentary/South Africa Documentary.mp4",
    image: "/images/adults/south.jpg",
    type: "doc",
    link: "/adult/cinema/national?title=South Africa Documentary&videoUrl=/adults/Documentary/South Africa Documentary.mp4&photoUrl=/images/adults/documentary.jpg",
  },
  {
    title: "Wild South",
    videoUrl: "/adults/Documentary/Wild South.mp4",
    image: "/images/adults/wild.jpg",
    type: "doc",
    link: "/adult/cinema/national?title=Wild South&videoUrl=/adults/Documentary/Wild South.mp4&photoUrl=/images/adults/doc2.jpg",
  },
  {
    title: "National Geographic",
    videoUrl: "/adults/Documentary/National Geographic.mp4",
    image: "/images/adults/national.jpg",
    type: "doc",
    link: "/adult/cinema/national?title=National Geographic&videoUrl=/adults/Documentary/National Geographic.mp4&photoUrl=/images/adults/doc3.jpg",
  },
  {
    title: "Alle unter einem Dach",
    videoUrl: "/adults/Series section/Alle unter einem Dach.mp4",
    image: "/images/adults/alle.jpg",
    type: "series",
    link: "/adult/cinema/series?title=Alle unter einem Dach&videoUrl=/adults/Series section/Alle unter einem Dach.mp4&photoUrl=/images/adults/series2.png",
  },
  {
    title: "Narcos",
    videoUrl: "/adults/Series section/Narcos.mp4",
    image: "/images/adults/narcos.jpg",
    type: "series",
    link: "/adult/cinema/series?title=Narcos&videoUrl=/adults/Series section/Narcos.mp4&photoUrl=/images/adults/series4.png",
  },
  {
    title: "Tulsa King",
    videoUrl: "/adults/Series section/Tulsa King.mp4",
    image: "/images/adults/king.webp",
    type: "series",
    link: "/adult/cinema/series?title=Tulsa King&videoUrl=/adults/Series section/Tulsa King.mp4&photoUrl=/images/adults/series6.png",
  },
];

export default SearchList;
