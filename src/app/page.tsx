'use client'
import { SaveAndProcessData } from "@/actions/server";
import Pregunta from "@/components/Pregunta";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-5 gap-5 bg-neutral-200 ">

      <Image src="/serenitas.png" alt="Serenitas" width={300} height={300} />

      <span className="text-center w-3/4 lg:w-1/2 text-2xl font-semibold text-zinc-700">
        ¡Hola!, espero te encuentres bien, a continuación te vamos a presentar un formulario de 3 preguntas que seran usadas para intentar detectar el bornout, esta data sera enviada a un psicologo profesional

      </span>

      <form 
      
      onSubmit={async (e)=>{
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        
        try{
          const res = await SaveAndProcessData(data)
          if(res.success){
            alert('Formulario enviado con exito')
          }
          else{
            alert(res.message)
          }
        }

        catch(e){
          alert(e)
        }
      
      }}

      className="w-3/4 lg:w-1/2 bg-neutral-50 flex flex-col gap-10 rounded-lg shadow-xl p-5">

        <article  className="w-full flex flex-col gap-5">

          <div>
              <span className=" text-primary font-semibold" >Nombre:</span>
              <input type="text" name="nombre_paciente" className="w-full border-primary border-2 outline-none rounded-lg p-3" />
          </div>

          <div>
              <span className=" text-primary font-semibold" >Fecha Nacimiento:</span>
              <input type="date" name="fecha_nacimiento" className="w-full border-primary border-2 outline-none rounded-lg p-3" />
          </div>

        </article>

        <Pregunta name="q1" pregunta="1. Considerando el último mes en tu trabajo actual, ¿cómo te sientes en el trabajo y cómo crees que tus emociones afectan tu desempeño laboral? (1/3)" />
        <Pregunta name="q2" pregunta="2. Considerando el último mes en tu trabajo actual, describe el tipo de relación que mantienes con tus compañeros/as de trabajo y cómo estas interacciones impactan en tu entorno laboral. (2/3)" />
        <Pregunta name="q3" pregunta="3. Considerando el último mes en tu trabajo actual, ¿sientes que logras cumplir con los objetivos de tu cargo y que tu trabajo te proporciona satisfacción y logros personales? (3/3)" />
        
        <button className="bg-primary w-3/4 self-center text-neutral-50 p-3 rounded-lg shadow-lg border-primary border-2 hover:bg-neutral-50 hover:text-primary transition-all">Enviar</button>

      </form>
      

    </main>
  );
}
