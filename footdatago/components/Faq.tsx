import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className='bg-black pb-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='py-8 text-center text-4xl md:text-6xl font-bold tracking-wide bg-gradient-to-r from-purple-500 to-blue-500  bg-clip-text text-transparent'>
            FAQ
          </h2>
        
          
          <div className='space-y-6'>
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-3xl md:rounded-2xl p-4 shadow-md shadow-purple-500/40'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="text-white text-lg md:text-xl p-1 md:p-2">
                    Comment puis-je commencer à utiliser FootDataGo ?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-sm md:text-base px-1 md:px-2">
                    Pour commencer, il suffit de créer un compte gratuit sur notre plateforme. 
                    Vous aurez ensuite accès à toutes les statistiques et données des joueurs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-3xl md:rounded-2xl p-4 shadow-md shadow-purple-500/40'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2" className="border-b-0">
                  <AccordionTrigger className="text-white text-lg md:text-xl p-1 md:p-2 ">
                    Quelles datas sont disponibles sur FootDataGo ?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-base">
        
                  Buts passe décisives XG XA xG90 xA90 kp90 apparitions minutes et bien d'autres.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-3xl md:rounded-2xl p-4 shadow-md shadow-purple-500/40'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-white text-lg md:text-xl p-1 md:p-2 ">
                    A quoi sert la section favoris ?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-base">
               La section sert a suivre vos joueur favoris pour avoir directement les datas que vous voulez et sans devoir a aller dans l'outil de comparaison a chaque fois.
              
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-3xl md:rounded-2xl p-4 shadow-md shadow-purple-500/40'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-white text-lg md:text-xl p-1 md:p-2 ">
                    Comment comparer les joueurs entre eux ?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-sm md:text-base">
                  Aller dans la page comparaison taper les joueurs que vous voulez comparez et notre outil vous sortira des graphiques détaillés pour chaque joueurs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-3xl md:rounded-2xl p-4 shadow-md shadow-purple-500/40'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-white text-lg md:text-xl p-1 md:p-2 ">
                    Des nouvelles fonctionnalités sont prévues ?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-base">
                 Oui le site est en version 0.6 donc des nouvelles fonctionnalités prévues comme pouvoir comparer plus de 2 joueurs, pouvoir avoir plus de filtre de recherches et d'autres choses que je ne peux pas dire encore.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='bg-gray-800/50 backdrop-blur-sm rounded-3xl md:rounded-2xl p-4 shadow-md shadow-purple-500/40'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-white text-lg md:text-xl p-1 md:p-2 ">
                   Comment vous contactez ? 
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-base">
                C'est tout simple allez dans la section retours et envoyer moi un mail en précisant la catégorie de votre demande 
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;