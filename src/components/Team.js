import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";


export const Team = () => {
  const [members, setMembers] = useState(null);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await apiRequest.get(
          "/teams?populate=team_member.picture",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
            },
          }
        );
        setMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  if (!members) {
    return <div>Loading...</div>;
  }
console.log(members)
  return (
    <div className="bg-white flex justify-center py-10">
      <div className="grid-cols-3 grid bg-white gap-4 w-7xl">
        <h2 className="text-2xl text-center text-black mb-4 col-span-3">Our Team</h2>
        {members.length > 0 &&
          members.map((member) => (
            <div className="card card-compact w-[210px] bg-base-100 shadow-xl grid content-center">
              <figure>
                <img
                  src={member.attributes.team_member.picture.data[0].attributes.url}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title mb-2">{member.attributes.team_member.first_name} {member.attributes.team_member.last_name}</h2>
                <p>{member.attributes.team_member.role}</p>
                <a href={`tel:${member.attributes.team_member.phone}`}>{member.attributes.team_member.phone}</a>
                <a href={`mailto:${member.attributes.team_member.email}`}>{member.attributes.team_member.email}</a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
