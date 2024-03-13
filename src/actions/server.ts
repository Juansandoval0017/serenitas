'use server'
import z from 'zod'
import mysql from 'mysql2/promise';
import { getTranstaleText } from '@/utils';
export async function SaveAndProcessData(data: FormData) {


    const schema = z.object({
        nombre_paciente: z.string(),
        fecha_nacimiento: z.string(),
        q1: z.string(),
        q2: z.string(),
        q3: z.string(),
    });


    try{

        //pasar de data a objeto

        const objectData = Object.fromEntries(data.entries());



        const result = schema.parse(objectData);
        //validar que q1,q2 y q3 tengan mas de 50 palabras y menos 200
        const q1 = result.q1;
        const q2 = result.q2;
        const q3 = result.q3;

       if (  q1.split(' ').length < 50 || q1.split(' ').length > 200) {
            
        return {
            success: false,
            message: 'La pregunta 1 debe tener mas de 50 palabras y menos de 200'
        }

       }
       if (  q2.split(' ').length < 50 || q2.split(' ').length > 200) {
            
        return {
            success: false,
            message: 'La pregunta 2 debe tener mas de 50 palabras y menos de 200'
        }

       }
       if (  q3.split(' ').length < 50 || q3.split(' ').length > 200) {
            
        return {
            success: false,
            message: 'La pregunta 3 debe tener mas de 50 palabras y menos de 200'
        }

       }

       //realizar la traducion de las preguntas

         const traduccion = {
              q1: await getTranstaleText(q1),
              q2: await getTranstaleText(q2),
              q3: await getTranstaleText(q3)
         }

         //verificar que la traduccion no este vacia 

            if(traduccion.q1 === "" || traduccion.q2 === "" || traduccion.q3 === ""){
                return {
                    success: false,
                    message: 'Error en traducir los datos, intente mas tarde'
                }
            }
        
        return {
            success: true,
            message: 'Datos guardados y procesados correctamente'
        }

    }

    catch(err){
        console.log(err);
        return {
            success: false,
            message: 'Error en los datos'
        }
    }


    }
  
