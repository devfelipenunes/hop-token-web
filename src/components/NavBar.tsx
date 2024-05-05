import Link from "next/link";

export default function NavBar() {
  const Menu = [
    {
      name: "home",
      route: "/",
    },
    {
      name: "cerveja",
      route: "/beer",
    },
    {
      name: "receitas",
      route: "/revenues",
    },
    {
      name: "carrinho",
      route: "/cart",
    },
    {
      name: "perfil",
      route: "/profile",
    },
  ];
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex p-5">
      <div className="flex flex-row justify-between">
        <p>icon</p>
        <div className="flex flex-row space-x-3">
          {Menu.map((item, index) => (
            <Link
              href={item.route}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
