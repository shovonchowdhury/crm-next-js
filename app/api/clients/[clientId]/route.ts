import { Client } from "@/models/client";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema to validate `clientId` route param
const clientIdSchema = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid clientId",
  });

// Zod schema for client update data (PUT)
// Zod schema for client update data
const updateClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().optional(),
  notes: z.string().optional(),
});

// GET: Get a client by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    const parseResult = clientIdSchema.safeParse(params.clientId);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const client = await Client.findById(params.clientId);

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, client }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// PUT: Update a client by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    const idCheck = clientIdSchema.safeParse(params.clientId);
    if (!idCheck.success) {
      return NextResponse.json(
        { success: false, error: idCheck.error.errors[0].message },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parseResult = updateClientSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const updatedClient = await Client.findByIdAndUpdate(
      params.clientId,
      parseResult.data,
      { new: true }
    );

    if (!updatedClient) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Client updated successfully", updatedClient },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a client by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    const parseResult = clientIdSchema.safeParse(params.clientId);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const deletedClient = await Client.findByIdAndDelete(params.clientId);

    if (!deletedClient) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
