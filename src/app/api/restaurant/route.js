import RestaurantsModel from "@/app/lib/RestaurantsModel";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const data = await RestaurantsModel.find();
  console.log(data);
  return NextResponse.json({ result: data });
}

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let payload = await request.json();
    const result = new RestaurantsModel(payload);
    console.log("result",result)
    await result.save(); 
    return NextResponse.json({ 
      success: true,
      message: "Restaurant data saved successfully",
      result: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error(new Error("Failed to save restaurant data"));
  }
}
