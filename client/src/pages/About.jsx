import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-4xl font font-semibold mb-10">About Fox Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-4">
            <p>
              Ever feel like you have something to say, but putting a face to it
              feels overwhelming? This blog is for you!
            </p>
            <p>
              We're all about sharing life's lessons, big and small. Whether
              you're a pro blogger or just starting out, this is a space to
              express yourself freely.
            </p>
            <p>
              Shy about showing your face? No worries! Here, you can share
              anonymously. Don't have perfect writing skills? That's okay too!
              This is a judgment-free zone for open expression.
            </p>
            <p>
              The most important thing is your story. Let your voice be heard,
              and together we can create a vibrant community of shared
              experiences. Dive into our latest posts, or consider sharing your
              own! We can't wait to hear from you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
