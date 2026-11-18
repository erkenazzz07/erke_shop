type IconProps = { readonly title?: string };

function Svg({ title, children }: IconProps & { readonly children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const BagIcon = (props: IconProps) => (
  <Svg {...props}><path d="M5 8h14l-1.2 12H6.2L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Svg>
);
export const HeartIcon = (props: IconProps) => (
  <Svg {...props}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></Svg>
);
export const UserIcon = (props: IconProps) => (
  <Svg {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Svg>
);
export const MenuIcon = (props: IconProps) => (
  <Svg {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);
export const CloseIcon = (props: IconProps) => (
  <Svg {...props}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
export const ArrowIcon = (props: IconProps) => (
  <Svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
