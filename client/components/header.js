import Link from 'next/link';

export default ({ isSignedIn }) => {
    const links = [
        !isSignedIn && {label: 'Sign In', href: '/auth/signin'},
        !isSignedIn && {label: 'Sign Up', href: '/auth/signup'},
        isSignedIn && {label: 'Sign Out', href: '/auth/signout'},
    ].filter(link => link).map(({label, href}) => {
        return(
            <li className='nav-item' key={href}>
                <Link className='nav-link' href={href}>{label}</Link>
            </li>
        )
    })

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link className="navbar-brand" href="/">
        GITTIX
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};
