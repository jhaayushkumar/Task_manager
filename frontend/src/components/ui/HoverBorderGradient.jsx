/* Simple hover border gradient wrapper inspired by hover.dev */
export const HoverBorderGradient = ({
  as: Tag = "button",
  containerClassName = "",
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`relative inline-flex rounded-lg p-[2px] transition-all duration-200 ${containerClassName}`}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 opacity-0 blur-sm transition-opacity duration-200 group-hover:opacity-100" />
      <Tag
        className={`relative z-10 rounded-[10px] border border-white/10 px-4 py-2 bg-white dark:bg-black text-black dark:text-white ${className}`}
        {...props}
      >
        {children}
      </Tag>
    </div>
  );
};


