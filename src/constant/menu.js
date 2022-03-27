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
    Book,
    Command,
    List,
    CheckSquare,
    Bell,
    File ,
    
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
        title: 'Donasi Rutin', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/program-donasi', title: 'Program Donasi', type: 'link' },
            // { path: '/donasi-kategori', title: 'Kategori Donasi', type: 'link' },
            // { path: '/paket', title: 'Paket Donasi', type: 'link' },
        ]
    },
    {
        title: 'Transaction', icon: CheckSquare, type: 'link', path: '/transaction', active: false
    },
    // {
    //     title: 'Donasi Rutin', icon: DollarSign, type: 'link', path: '/donasi-kategori', active: false
    // },
    {
        title: 'Tentang Kami', icon: AtSign, type: 'link', path: '/tentang-kami', active: false
    },
    {
        title: 'Program', icon: Bookmark, type: 'sub', active: false, children: [
            { path: '/program-utama', title: 'Program Utama', type: 'link' },
            { path: '/program-incidental', title: 'Program Incidental', type: 'link' },
        ]
    },
    // {
    //     title: 'Program', icon: Bookmark, type: 'link', path: '/program', active: false
    // },
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
        title: 'Qris', icon: Command, type: 'link', path: '/qris', active: false
    },
    // {
    //     title: 'History', icon: List, type: 'link', path: '/history', active: false
    // },   
    {
        title: 'Penggalang', icon: List, type: 'link', path: '/penggalang', active: false
    },   
    {
        title: 'Reminder', icon: Bell, type: 'link', path: '/reminder', active: false
    },   
    {
        title: 'Nominal', icon: DollarSign, type: 'link', path: '/nominal', active: false
    },
    // {
    //     title: 'Kabar Terbaru', icon: FileText, type: 'link', path: '/kabarterbaru', active: false
    // },   
    {
        title: 'Kabar Terbaru', icon: FileText, type: 'sub', active: false, children: [
            { path: '/kabar-terbaru-ot', title: 'Kabar Terbaru OT', type: 'link' },
            { path: '/kabar-terbaru-rutin', title: 'Kabar Terbaru Rutin', type: 'link' },
        ]
    },
    {
        title: 'Menu External', icon: Shuffle, type: 'link', path: '/menu', active: false
    },
    {
        title: 'Upload PDF', icon: File, type: 'link', path: '/upload', active: false
    },
    {
        title: 'Kategori', icon: Columns, type: 'link', path: '/onetime-kategori', active: false
    },
]

