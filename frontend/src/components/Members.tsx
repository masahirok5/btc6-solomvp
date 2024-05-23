import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface Member {
  id: number;
  name: string;
}

export const Members: FC = () => {
  const [members, setMembers] = useState<null | Member[]>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('member/0');
      //   const res = await fetch('http://localhost:8080/member/0');
      console.log(res);
      const members = await res.json();
      console.log(members);
      setMembers(
        members.map((obj: Member, i: number) => <p key={i}>{obj.name}</p>)
      );
    })();
  }, []);

  return <>{members}</>;
};
