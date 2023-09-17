import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="grid grid-cols-2 items-center">
        <div className="">
          <h4 className="font-bold text-2xl mb-3 text-amber-500">
            Simplify your Email Campaign with Mail Merge
          </h4>
          <p className="text-lg text-gray-800">
            A simple mail merge application is a tool that enables users to send
            multiple personalized emails efficiently. Users can input a list of
            recipients and customize the content and greetings for each email.
            The application then automatically generates and sends these emails
            to the specified recipients, saving time and effort compared to
            sending individual emails manually. It's a handy solution for tasks
            like sending out newsletters, invitations, or announcements to a
            large number of people while ensuring a personal touch in each
            message.
          </p>
        </div>
        <div className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="0.5"
            stroke="currentColor"
            className="w-40"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
