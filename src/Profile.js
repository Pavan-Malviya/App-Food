import { useEffect, useState } from "react";
import { Github_API_User } from "./constants";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        try {
            setLoading(true);
            const data = await fetch(Github_API_User);
            if (!data.ok) throw new Error('Failed to fetch profile');
            const json = await data.json();
            setProfile(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
                    <div className="animate-pulse">
                        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <p className="text-gray-600 mb-4">Failed to load profile</p>
                    <button 
                        onClick={getProfile}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative mb-6">
                    <img 
                        className="w-32 h-32 rounded-full mx-auto border-4 border-orange-200 shadow-lg" 
                        src={profile.avatar_url} 
                        alt={profile.name || 'Profile'}
                    />
                    <div className="absolute bottom-2 right-1/2 transform translate-x-16 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name || 'Developer'}</h2>
                <p className="text-orange-500 font-medium mb-4">@{profile.login}</p>
                
                {profile.bio && (
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{profile.bio}</p>
                )}
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{profile.public_repos || 0}</div>
                        <div className="text-xs text-gray-500">Repositories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{profile.followers || 0}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{profile.following || 0}</div>
                        <div className="text-xs text-gray-500">Following</div>
                    </div>
                </div>
                
                {profile.location && (
                    <div className="flex items-center justify-center text-gray-600 mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-sm">{profile.location}</span>
                    </div>
                )}
                
                <a 
                    href={profile.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View GitHub
                </a>
            </div>
        </div>
    );
};

export default Profile;