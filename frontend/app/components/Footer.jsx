
function Footer() {
    return (
      <footer className="fixed bottom-0 w-full bg-blue text-white">
        <div className="container mx-auto p-4">
          <div className="flex justify-center">
            <div className="text-center">
              <p className="text-sm">&copy; 2023 Mail Merge. All rights reserved.</p>
              <p className="text-sm">
                Created By:
                    <a href="https://github.com/OluwaninsolaAO" className="hover:underline"> Abraham Olagunju</a>,
                    <a href="https://github.com/MikeRock51" className="hover:underline"> Michael Adebayo</a> &
                    <a href="https://github.com/ajipelumi" className="hover:underline"> Ajisafe Oluwapelumi</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
}
  
export default Footer;
  