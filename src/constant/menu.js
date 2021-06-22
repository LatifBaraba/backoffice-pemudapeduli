import {
    Home,
    // Anchor,
    // Headphones,
    Users,
    Image,
    DollarSign,
    AtSign,
    Award,
    // BookOpen,
    Columns,
    FileText,
    Bookmark,
    ExternalLink,
    Hash,
    CheckCircle,
    UserCheck,
    CreditCard,
    Shuffle,
    Book
} from 'react-feather';

export const MENUITEMS = [
    // {
    //     title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
    //         { path: '/dashboard/default', title: 'Default', type: 'link' },
    //         { path: '/dashboard/ecommerce', title: 'E-Commerce', type: 'link' },
    //         { path: '/dashboard/university', title: 'University', type: 'link' },
    //         { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
    //         { path: '/dashboard/project', title: 'Project', type: 'link' }
    //     ]
    // },
    // {
    //     title: 'Support Ticket', icon: Anchor, type: 'link', path: '/support-ticket/supportTicket', active: false
    // },
    // {
    //     path: 'http://support.pixelstrap.com/help-center', title: 'Raise Support', icon: Headphones, type: 'exteral_link', active: false
    // },
    {
        title: 'Dashboard', icon: Home, type: 'link', path: '/dashboard', active: false
    },
    {
        title: 'User', icon: Users, type: 'link', path: '/user', active: false
    },
    {
        title: 'Banner', icon: Image, type: 'link', path: '/banner', active: false
    },
    {
        title: 'Donasi One Time', icon: DollarSign, type: 'link', path: '/donasi-onetime', active: false
    },
    {
        title: 'Donasi Rutin', icon: DollarSign, type: 'link', path: '/donasi-rutin', active: false
    },
    {
        title: 'Tentang Kami', icon: AtSign, type: 'link', path: '/tentang-kami', active: false
    },
    {
        title: 'Program', icon: Bookmark, type: 'link', path: '/program', active: false
    },
    {
        title: 'Achievement', icon: Award, type: 'link', path: '/achievement', active: false
    },
    {
        title: 'Berita', icon: FileText, type: 'link', path: '/berita', active: false
    },
    {
        title: 'Album', icon: Columns, type: 'link', path: '/album', active: false
    },
    {
        title: 'Beneficaries', icon: CreditCard, type: 'link', path: '/beneficaries', active: false
    },
    {
        title: 'Partner', icon: ExternalLink, type: 'link', path: '/partner', active: false
    },
    {
        title: 'Team', icon: UserCheck, type: 'link', path: '/team', active: false
    },
    {
        title: 'Testimoni', icon: CheckCircle, type: 'link', path: '/testimoni', active: false
    },
    {
        title: 'Kontak', icon: Hash, type: 'link', path: '/kontak', active: false
    },
    {
        title: 'Hubungi', icon: Book, type: 'link', path: '/hubungi', active: false
    },
    {
        title: 'Menu External', icon: Shuffle, type: 'link', path: '/menu', active: false
    },
]

