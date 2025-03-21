import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const Team = () => {
  const {t} = useTranslation();
  const { team: members } = useGetAll();

  if (!members || members.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        {t("team.title")}
      </h2>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {members.length > 0 &&
          members.map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-8"
            >
              <div className="overflow-hidden h-full bg-gray-200 rounded-lg shadow-lg">
                <img
                  src={
                    member.attributes.team_member.picture.data[0].attributes.url
                  }
                  alt={`${member.attributes.team_member.first_name} ${member.attributes.team_member.last_name}`}
                  className="w-full h-auto object-cover"
                />
                <div className="bg-gray-200 text-center py-2 flex flex-col items-center">
                  <p className="text-lg font-semibold text-black">{`${member.attributes.team_member.first_name} ${member.attributes.team_member.last_name}`}</p>
                  <p className="text-gray-600">
                    {member.attributes.team_member.role}
                  </p>
                  {member.attributes.team_member.phone && (
                    <a
                      className="flex justify-center items-center gap-1 text-gray-700 hover:text-black mt-1"
                      href={`tel:${member.attributes.team_member.phone}`}
                    >
                      <FaPhoneAlt />
                      {member.attributes.team_member.phone}
                    </a>
                  )}
                  {member.attributes.team_member.email && (
                    <a
                      className="flex justify-center items-center gap-1 text-gray-700 hover:text-black mt-1"
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
