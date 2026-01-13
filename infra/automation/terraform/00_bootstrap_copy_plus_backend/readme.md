This folder contains the exact content of the
folder 00_bootstrap plus the file backend.tf.
It it is intended to be used to import
resources created by 00_bootstrap and persist
the state into the remote backend in constrast
to 00_bootstrap which state is local (because
00_bootstrap creates the remote backend bucket,
its state is not persisted there).