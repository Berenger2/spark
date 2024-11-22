import tarfile
import os
 
# Chemin du dossier contenant les fichiers .tar.gz
dossier = "./GSOD_Files"
 
# Parcourir tous les fichiers du dossier
for fichier in os.listdir(dossier):
    if fichier.endswith(".tar.gz"):
        # Chemin complet de l'archive
        chemin_fichier = os.path.join(dossier, fichier)
 
        # Nom du sous-dossier basé sur le nom de l'archive (sans extensions)
        nom_sous_dossier = os.path.splitext(os.path.splitext(fichier)[0])[0]
        chemin_sous_dossier = os.path.join(dossier, nom_sous_dossier)
 
        # Créer le sous-dossier s'il n'existe pas
        if not os.path.exists(chemin_sous_dossier):
            os.makedirs(chemin_sous_dossier)
 
        # Extraire les fichiers dans le sous-dossier
        print(f"Extraction de {chemin_fichier} dans {chemin_sous_dossier}...")
        with tarfile.open(chemin_fichier, "r:gz") as archive:
            archive.extractall(chemin_sous_dossier)
        print(f"Extraction terminée pour {fichier} !")
 
 