import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = ({
  pages,
}: {
  pages: { href: string; name: string; Icon?: JSX.Element }[];
}) => {
  const router = useRouter();
  return (
    <div className="navigation">
      <div className="navigation__section">
        <h3>Navigation</h3>
        <div className="navigation__container">
          {pages.map(({ href, name, Icon }) => (
            <Link
              href={href}
              key={href}
            >
              <a>
                <div
                  className={
                    router.route === href
                      ? "navigation__item active"
                      : "navigation__item"
                  }
                >
                  {Icon}
                  <p>{name}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
