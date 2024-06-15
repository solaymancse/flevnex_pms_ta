<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientInfoRequest;
use App\Models\PatientInformation;
use Illuminate\Http\Request;

class PatientController extends Controller
{

    public function getPatient(Request $request)
    {
        try {
            $search = $request->query('search');
            $gender = $request->query('gender');
            $query = PatientInformation::query();

            if ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('number', 'like', '%' . $search . '%');
            }

            // Apply gender filter
            if ($gender) {
                $query->where('gender', $gender);
            }

            $perPage = $request->query('perPage', 5);

            $data = $query->latest()->paginate($perPage);

            return response()->json([
                'status' => 200,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => $e->getMessage()
            ]);
        }
    }
    public function createPatient(PatientInfoRequest $request)
    {
        try {
            info("enerin..");
            $data = $request->validated();

            $patient =  PatientInformation::create($data);

            return response()->json([
                'status' => 201,
                'message' => "New Patient Created Successfully",
                'data' => $patient
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function editPatient(PatientInfoRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $patient = PatientInformation::where('id', $id)->update($data);
            if ($patient) {
                return response()->json([
                    'status' => 200,
                    'message' => "Patient Updated Successfully",
                    'data' => $patient
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function deletePatient($id)
    {
        try {
            $patient = PatientInformation::where('id', $id)->delete();
            if ($patient) {
                return response()->json([
                    'status' => 200,
                    'message' => "Patient Deleted Successfully",
                    'data' => $patient
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ]);
        }
    }

    // counts  

    public function countPatients()
    {
        $count = PatientInformation::count();

        return response()->json(['count' => $count]);
    }

    public function countTodayPatients()
    {
        $count = PatientInformation::whereDate('created_at', date('Y-m-d'))->count();

        return response()->json(['count' => $count]);
    }
}
