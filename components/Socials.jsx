import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaFacebook, FaTwitter } from 'react-icons/fa';

const socials = [
    { icon: <FaGithub />, path: 'https://github.com/' },
    { icon: <FaLinkedinIn />, path: 'https://linkedin.com/' },
    { icon: <FaFacebook />, path: 'https://facebook.com/' },
    { icon: <FaTwitter />, path: 'https://twitter.com/' },
];

const Socials = () => {
    return (
        <div className="flex gap-4">
            {socials.map((social, index) => (
                <Link key={index} href={social.path} target="_blank" rel="noopener noreferrer">
                    <span className="text-2xl hover:text-blue-500 transition">{social.icon}</span>
                </Link>
            ))}
        </div>
    );
};

export default Socials;
