
type TeamMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Away";
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Frontend Developer",
    email: "alex@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "UI/UX Designer",
    email: "sarah@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "David Lee",
    role: "Backend Developer",
    email: "david@example.com",
    status: "Away",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Project Manager",
    email: "emily@example.com",
    status: "Active",
  },
];

function Team() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Team Members
        </h2>
        <p className="mt-1 text-slate-500">
          Manage your team and collaborate on projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
                {member.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {member.role}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-600">
              {member.email}
            </p>

            <div className="mt-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  member.status === "Active"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
