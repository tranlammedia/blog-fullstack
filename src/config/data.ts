export interface TypeUser {
  id: string;
  name: string;
  role: "admin" | "author" | "reader";
}
export interface TypePost {
  id: string;
  title: string;
  content: string;
  author: string;
}

export interface TypeComment {
  id: string;
  comment: string;
  userid: string;
  repcomments?: Array<string>;
}
export let USER: TypeUser[] = [
  { id: "user1", name: "name user1", role: "admin" },
  { id: "user2", name: "name user2", role: "reader" },
];

export let POSTS: TypePost[] = [
  {
    id: "post1",
    title: "Post 1",
    content:
      "ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate  ",
    author: "User1",
  },
  {
    id: "post2",
    title: "Post 2",
    content:
      "vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet  ",
    author: "User2",
  },
  {
    id: "post3",
    title: "Post 3",
    content:
      "enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in  ",
    author: "User1",
  },
  {
    id: "post4",
    title: "Post 4",
    content:
      "augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo  ",
    author: "User1",
  },
  {
    id: "post5",
    title: "Post 5",
    content:
      "id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum  ",
    author: "User2",
  },
];

export let COMMENTS: TypeComment[] = [
  {
    id: "commentid1",
    comment: "comment 1",
    userid: "userid1",
    repcomments: ["commentid2"],
  },
  {
    id: "commentid2",
    comment: "comment 2",
    userid: "userid2",
    repcomments: [],
  },
];
