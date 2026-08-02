import React from 'react';
import Link from 'next/link';
import BioPhoto from 'src/components/BioPhoto';
import DnaPipeline from 'src/components/DnaPipeline';
import { getAllPosts } from 'src/lib/posts';
import '../styles/home.css';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const Page = () => {
  const posts = getAllPosts();

  return (
    <div className="home">
      <main className="home__inner">
        <section className="bio">
          <BioPhoto />
          <div className="bio__text">
            <h1 className="bio__name">Harinarayanan</h1>
            <p className="bio__tagline">
              Hey! I&rsquo;m a full stack developer at EE, a polyglot programmer with a tick for technology,
              programming and football(gooner).
            </p>
            <p className="bio__tagline">
              This blog of mine is an attempt to explore and record whatever helped me to get things done! Reach out
              to me if you&rsquo;d like to talk!
            </p>
          </div>
        </section>

        <section className="section" id="writing">
          <h2 className="section__title">Writing</h2>
          <ul className="writing__list">
            {posts.slice(0, 5).map((post) => (
              <li className="writing-item" key={post.slug}>
                <Link href={`/writing/${post.slug}`} className="writing-item__title">
                  {post.title}
                </Link>
                <span className="writing-item__date">{formatDate(post.date)}</span>
              </li>
            ))}
            <li className="writing-item">
              <Link href="/writing" className="writing-item__title writing-item__title--all">
                All posts &rarr;
              </Link>
            </li>
          </ul>
        </section>

        <section className="section" id="dna">
          <DnaPipeline />
        </section>

        <section className="section" id="connect">
          <h2 className="section__title">Connect</h2>
          <ul className="connect__list">
            <li>
              <a href="#" className="connect__link">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="connect__link">
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Page;
