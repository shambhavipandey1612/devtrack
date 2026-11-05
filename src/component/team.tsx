
import { useEffect, useState } from "react";

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
  const [members, setMembers] = useState<TeamMember[]>(()=>{
    const savedMembers = localStorage.getItem("teamMembers");
    return savedMembers? JSON.parse(savedMembers) : teamMembers;
  });
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Active" | "Away">("Active");
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);

  useEffect(()=>{
    localStorage.setItem("teamMembers", JSON.stringify(members));
  },[members]);
function handleAddMember(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (editingMemberId !== null) {
    // Update existing member
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === editingMemberId
          ? { ...member, name, role, email, status }
          : member
      )
    );
  } else {
    // Add new member
    const newMember: TeamMember = {
      id: Date.now(),
      name,
      role,
      email,
      status,
    };

    setMembers((prevMembers) => [...prevMembers, newMember]);
  }

  // Reset form
  setName("");
  setRole("");
  setEmail("");
  setStatus("Active");
  setEditingMemberId(null);
  setShowForm(false);
}

  function handleDeleteMember(id:number){
    const confirmDelete= window.confirm("Are you sure you want to delete this member?");
    if(confirmDelete){
      setMembers((prevMembers)=> prevMembers.filter((member)=>
      member.id!==id));
    }
  }

  function handleEditMember(member: TeamMember) {
  setName(member.name);
  setRole(member.role);
  setEmail(member.email);
  setStatus(member.status);
  setEditingMemberId(member.id);
  setShowForm(true);
}

  return (
    <div className="space-y-6">
       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
  <div>
    <h2 className="text-2xl font-bold text-slate-800">
      Team Members </h2>
    <p className="mt-1 text-slate-500">
      Manage your team and collaborate on projects.</p>
  </div>

  <button
    onClick={() => setShowForm(!showForm)}
    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
    {showForm ? "Cancel" : "+ Add Member"} </button>
</div>

{showForm && (
  <form
    onSubmit={handleAddMember}
    className="space-y-4 rounded-xl bg-white p-6 shadow-sm" >
    <h3 className="text-lg font-semibold text-slate-800">
      {editingMemberId !== null ? "Edit Team Member" : "Add New Team Member"}
     </h3>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">
        Full Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter full name"
        required
        className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-indigo-500" />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">
        Role
      </label>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="e.g. Frontend Developer"
        required
        className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-indigo-500" />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
        className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-indigo-500" />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-600">
        Status
      </label>
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "Active" | "Away")
        }
        className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-indigo-500">
        <option value="Active">Active</option>
        <option value="Away">Away</option>
      </select>
    </div>

    <button
      type="submit"
      className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
        {editingMemberId !== null ? "Update Member" : "Add Team Member"}
    </button>
  </form>
)}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-xl bg-white p-6 shadow-sm" >
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
            <button onClick={()=>handleDeleteMember(member.id)}
            className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">
              Delete Member
            </button>
            <button onClick={() => handleEditMember(member)}
           className="mr-2 mt-4 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
        Edit Member
         </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
