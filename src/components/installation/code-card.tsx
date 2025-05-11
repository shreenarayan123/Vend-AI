import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeHightLight from "./code-highlight";

type Props = {
  code: string[];
};

const CodeCard = ({code}: Props) => {
  return (
    <Tabs defaultValue="html" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="react">React</TabsTrigger>
      </TabsList>
      <TabsContent value="html">
        <Card>
          <CardHeader>
            <p className='text-xl ' > Add the below code in script tag at the end of body of  index.html</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <CodeHightLight code={code[0]} lang="javascript" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="react">
        <Card>
          <CardHeader>
           <p className='text-xl ' > Add the below code in script tag in head of index.html</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <CodeHightLight code={code[1]} lang="jsx" />      
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CodeCard;
