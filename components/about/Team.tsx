import React from "react";
import TeamMemberCard from "./TeamMemberCard";

const members = [
  {
    id: 1,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-1.png",
    name: "Leo Messi",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 2,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-2.png",
    name: "Ana Missar",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 3,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-3.png",
    name: "Ken Adison",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 4,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-4.png",
    name: "Lemon Trea",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 5,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-5.png",
    name: "Elon Musk",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 6,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-6.png",
    name: "Larry Page",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 7,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-7.png",
    name: "Bill Gates",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
  {
    id: 8,
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-8.png",
    name: "Bernard Shaw",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fuga esse quibusdam dolor veritatis similique sin",
  },
];

const Team = () => {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 my-10">
        <h4 className="uppercase font-[600] text-slate-500">Meet our team</h4>
        <h1 className="text-4xl font-bold mb-6">Our leadership team </h1>
      </div>
      <div className="grid max-md:grid-cols-2 grid-cols-4 gap-y-10  gap-x-6">
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
