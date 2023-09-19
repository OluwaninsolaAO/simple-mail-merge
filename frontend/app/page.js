import Image from "next/image";
import MailImage from "../public/mail-img.svg";

export default function Home() {
  return (
    <main className="flex min-h-full flex justify-between p-24">
      <div className="md:grid grid-cols-2 items-center">
        <div className="">
          <h4 className="font-bold text-4xl mb-3 text-blue">
            Simplify your Email Campaign with Mail Merge.
          </h4>
          <p className="text-black text-lg mb-3">
            With Mail Merge, you can easily customize content, greetings, 
            and more for every recipient, making each email feel uniquely personal. 
            Simply input your recipient list, tailor your email content, 
            and let the application handle the rest.
          </p>
          <p className="text-black text-lg mb-3">
            Whether you're sending out newsletters, invitations, or announcements 
            to a large audience, Mail Merge ensures a personal touch in every message.
          </p>
        </div>
        <div className="mx-auto">
          <Image src={MailImage} alt="Mail Image" />
        </div>
      </div>
    </main>
  );
}
