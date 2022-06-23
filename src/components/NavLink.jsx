import { Link, useMatch, useResolvedPath } from "react-router-dom";

export const NavLink = ({
  children,
  activeClassName,
  className,
  to,
  ...props
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const cssClassName = `${className} ${match ? activeClassName ?? "" : ""}`;

  return (
    <Link className={cssClassName} to={to} {...props}>
      {children}
    </Link>
  );
};
