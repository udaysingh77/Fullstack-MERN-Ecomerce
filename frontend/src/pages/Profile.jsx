import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile">profile</TabsTrigger>
          <TabsTrigger value="Orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className=" flex flex-col justify-center items-center bg-gray-100">
              <h1 className=" font-bold mb-7 text-2xl text-gray-800">Update Profile</h1>
              <div className="w-full gap-8 justify-between items-start px-7 max-w-2xl">
                {/* Profile picture */}
                <div className="flex flex-col items-center">
                  <img src="./udayImg.jpg" alt="profile" className="w-32 h-32 rounded-full object-cover border-4 border-pink-700" />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700">change Picture
                    <input type="file" accept="image/*" className="hidden" />
                  </Label>
                </div>
                {/* Profile Form */}
                <form className="space-y-4 shadow-lg p-5 rounded-lg bg-white">
                  <div>
                    <div>
                      <Label>FirstName</Label>
                      <Input></Input>
                    </div>
                    <div>
                      <Label>LastName</Label>
                      <Input></Input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="Orders">
          Change your Orders here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
