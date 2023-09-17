import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="grid grid-cols-2 items-center">
        <div className="">
          <h4 className="font-bold text-2xl mb-3">
            Simplify your Email Campaign with Mail Merge
          </h4>
          <p className="text-lg">
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
          <Image
            src=""
          />
        </div>
      </div>
    </main>
  );
}
