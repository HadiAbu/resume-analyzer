import Navbar from "~/components/Navbar";

const upload = () => {
  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h2>Upload your resume</h2>
        </div>
      </section>
    </main>
  );
};

export default upload;
