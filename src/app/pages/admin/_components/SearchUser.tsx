import { getUser } from "@/actions/mock-server-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function SearchUser() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("search", search);
      const user = await getUser(search);
      setUser(user);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search User</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Search user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="default" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
        <p>Found: {typeof user === "string" ? user : user?.name}</p>
      </CardContent>
    </Card>
  );
}

export default SearchUser;
