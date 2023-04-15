export class ProductRequests {
  constructor(
    public id: number,
    public title: string,
    public category: string,
    public upvotes: number,
    public status: string,
    public description: string,
    public comments: object[]
  ) {}
}
