export interface SocialPost {
    id: string;
    date: string;
    networks: {
        facebook?: boolean;
        instagram?: boolean;
        twitter?: boolean;
    };
    status: 'draft' | 'published' | 'archived';
    image: string;
    caption?: string; 
}


export interface SocialPostFormType {
    date: string;
    'networks.facebook'?: boolean;
    'networks.instagram'?: boolean;
    'networks.twitter'?: boolean;
    status: 'draft' | 'published' | 'archived';
    image: File | null;
    caption?: string;
}


export type SocialPostRequest = FormData;