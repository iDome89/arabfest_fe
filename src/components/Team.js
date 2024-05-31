import React, { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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

  return (
    <div className="bg-white py-10">
      <h2 className="text-3xl text-center text-black mb-12">Náš tým</h2>
      <div className="container mx-auto flex flex-wrap justify-center">
        {members.length > 0 &&
          members.map((member, index) => (
            <div
              key={index}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-8"
            >
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={
                    member.attributes.team_member.picture.data[0].attributes.url
                  }
                  alt={`${member.attributes.team_member.first_name} ${member.attributes.team_member.last_name}`}
                  className="w-full h-auto object-cover"
                />
                <div className="bg-gray-200 text-center py-2 flex-col flex">
                  <p className="text-lg font-semibold text-black">{`${member.attributes.team_member.first_name} ${member.attributes.team_member.last_name}`}</p>
                  <p className="text-gray-600">
                    {member.attributes.team_member.role}
                  </p>
                  {member.attributes.team_member.phone && (
                    <a
                      className="flex justify-center items-center gap-1"
                      href={`tel:${member.attributes.team_member.phone}`}
                    >
                      <FaPhoneAlt />
                      {member.attributes.team_member.phone}
                    </a>
                  )}
                  {member.attributes.team_member.email && (
                    <a
                      className="flex justify-center items-center gap-1"
                      href={`mailto:${member.attributes.team_member.email}`}
                    >
                      <MdEmail />
                      {member.attributes.team_member.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
